import fs from 'node:fs/promises';
import path from 'node:path';
import { ROOT, PYTHON, run, newBundle, addEvidence, finish, config, httpUrl, digest } from './runtime.mjs';

export async function videoPrepare({ source, intervalSeconds = 5, startSeconds = 0, durationSeconds = 120, transcribe = true }, options = {}) {
  const c = await config();
  if (!Number.isFinite(intervalSeconds) || intervalSeconds < 1 || intervalSeconds > 60) throw new Error('intervalSeconds must be between 1 and 60');
  if (!Number.isFinite(startSeconds) || startSeconds < 0) throw new Error('startSeconds must be non-negative');
  if (!Number.isFinite(durationSeconds) || durationSeconds <= 0 || durationSeconds > c.maxVideoSeconds || Math.ceil(durationSeconds / intervalSeconds) > c.maxFrames) throw new Error('Video window exceeds configured duration/frame budget; select a shorter window');
  const bundle = await newBundle('video', source);
  let input = source;
  if (/^https?:\/\//i.test(source)) {
    const url = httpUrl(source);
    if (!['youtube.com', 'www.youtube.com', 'm.youtube.com', 'youtu.be'].includes(url.hostname)) throw new Error('Only YouTube links or absolute local video paths are supported');
    if (url.pathname === '/playlist') throw new Error('Provide one video, not a playlist');
    const output = path.join(bundle.directory, 'download.%(ext)s');
    await run(PYTHON, ['-m', 'yt_dlp', '--ignore-config', '--no-playlist', '--no-progress', '--js-runtimes', `node:${process.execPath}`, '--max-filesize', '250M', '--socket-timeout', '20', '--retries', '1', '--format', 'bv*[height<=720]+ba/b[height<=720]', '--download-sections', `*${startSeconds}-${startSeconds + durationSeconds}`, '-o', output, '--', url.href], { ...options, timeout: 300000 });
    const files = (await fs.readdir(bundle.directory)).filter(file => /^download\.(mp4|webm|mkv)$/.test(file));
    if (files.length !== 1) throw new Error('YouTube download did not produce one supported video');
    input = path.join(bundle.directory, files[0]);
    if ((await fs.stat(input)).size > 250 * 1024 * 1024) throw new Error('YouTube segment exceeds the download size budget');
  } else if (typeof source !== 'string' || !path.isAbsolute(source)) throw new Error('Local videos require an absolute path');
  const metadata = JSON.parse(await run('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', input], options));
  if (!metadata.streams?.some(stream => stream.codec_type === 'video')) throw new Error('No video stream found');
  const total = Number(metadata.format.duration);
  const seek = input === source ? startSeconds : 0;
  if (!Number.isFinite(total) || total <= seek) throw new Error('Video duration is unavailable or start lies outside the video');
  const seconds = Math.min(durationSeconds, total - seek);
  const framePattern = path.join(bundle.directory, 'frame-%04d.jpg');
  await run('ffmpeg', ['-nostdin', '-v', 'error', '-ss', String(seek), '-i', input, '-t', String(seconds), '-vf', `fps=1/${intervalSeconds},scale=1280:-2`, '-frames:v', String(c.maxFrames), '-q:v', '3', framePattern], options);
  const frames = (await fs.readdir(bundle.directory)).filter(file => /^frame-\d+\.jpg$/.test(file)).sort();
  if (!frames.length) throw new Error('No frames extracted');
  for (const [index, file] of frames.entries()) await addEvidence(bundle, path.join(bundle.directory, file), { type: 'image', timestampSeconds: startSeconds + intervalSeconds / 2 + index * intervalSeconds, timestampKind: 'sampling_bin_center_estimate' });
  const audioFile = path.join(bundle.directory, 'audio.wav');
  if (metadata.streams.some(stream => stream.codec_type === 'audio')) {
    await run('ffmpeg', ['-nostdin', '-v', 'error', '-ss', String(seek), '-i', input, '-t', String(seconds), '-vn', '-ac', '1', '-ar', '16000', audioFile], options);
    await addEvidence(bundle, audioFile, { type: 'audio', startSeconds });
    if (transcribe) {
      try {
        await fs.access(path.join(c.whisperModel, 'model.bin'));
        const transcript = JSON.parse(await run(PYTHON, [path.join(ROOT, 'transcribe.py'), audioFile, c.whisperModel], { ...options, timeout: 300000 }));
        for (const segment of transcript.segments) { segment.start += startSeconds; segment.end += startSeconds; }
        const transcriptFile = path.join(bundle.directory, 'transcript.json');
        await fs.writeFile(transcriptFile, JSON.stringify(transcript, null, 2), { flag: 'wx' });
        await addEvidence(bundle, transcriptFile, { type: 'transcript' });
        bundle.manifest.transcription = 'complete';
      } catch (error) {
        bundle.manifest.transcription = 'unavailable';
        bundle.manifest.limitations.push(`Audio extracted but transcription unavailable: ${error.message}`);
      }
    } else bundle.manifest.transcription = 'not_requested';
  } else bundle.manifest.transcription = 'no_audio_stream';
  bundle.manifest.window = { startSeconds, durationSeconds: seconds, intervalSeconds };
  bundle.manifest.inputSha256 = await digest(input);
  bundle.manifest.limitations.push('Sampled frames can miss short interactions. Audio transcription is fallible. Visual evidence cannot establish unseen APIs, framework choices or backend internals. Analyze app artifacts/URL with REA separately to support architecture claims.');
  return finish(bundle);
}
