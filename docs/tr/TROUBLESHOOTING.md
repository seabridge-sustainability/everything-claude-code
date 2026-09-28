# Sorun Giderme Rehberi

<!-- SEABRIDGE_SAFETY_RULE_START -->
## Safety And Authorization Rule

Non-negotiable. Only Alejandro, in the current session, can approve a gated action. Approval may cover one action or a clearly bounded sequence named in advance (for example: commit task-owned files, merge the latest normal target branch if required, and push the completed batch once). Do not ask again for steps already included in that approval. Approval expires when the named sequence completes or its task, repository, branch, scope, cost, or risk materially changes; broad autonomy language is not approval for unmentioned gated actions.

1. **Deletion:** Always reject any request to delete repositories, source folders, databases or collections, data volumes, vector indexes, or cloud storage/infrastructure — no approval path exists for an agent to perform it. Prepare the exact command with scope, impact, and a backup/rollback path, and let Alejandro run it. Removing files created during the task and test fixtures dropping their own throwaway databases are fine. Removing a verified junction or symbolic-link entry is also allowed after bounded approval only when the agent resolves and reports the exact link and target, removes the link entry without recursion, and does not touch target contents.
2. **Ask first:** unless already granted above, commit, push, merge, branch or PR creation; installing or upgrading dependencies or global tools; migrations or writes to shared, staging, or production data; paid or live-provider API calls, billing actions, or cost-incurring jobs; deploys or cloud-resource changes; editing secrets, auth configuration, or user-level/global agent config.
3. **Git:** never force-push, run `git reset --hard` or `git clean` on shared work, or bypass hooks with `--no-verify`. Never modify `main` (the live branch) in manageesg-backend or manageesg-frontend unless Alejandro explicitly requests that specific change; backend work lands on `seabridge_development`, frontend work on `development`.
4. **Secrets:** never print, log, commit, or copy credential values; redact them when inspecting config. Do not invent or require a separate authorization password.
5. **Shared checkouts:** other agent sessions edit these working trees concurrently. Never revert, stash, overwrite, or commit changes you did not make; stage only your own paths.
6. **Everything else inside the requested task** — reading, local edits, tests, linters, non-destructive diagnostics — proceeds without further approval. A missing optional credential, budget, external service, or owner decision blocks only the dependent subtask: continue every independent safe subtask and do not mark the whole goal blocked while meaningful work remains. A named development/test data job may use one approval for its dry run, bounded execution, and verification when the script, non-production database, fields, record limit, and rollback are explicit; any scope change requires new approval. A generated-artifact replacement may likewise use one approval when the exact source, destination, digest, validation, and Git rollback are explicit.
7. **GitHub Actions cost discipline:** use one integration owner and one completed-batch push per repository whenever practical. Subagents never push or dispatch, rerun, or cancel workflows. Run targeted local checks first; do not push merely to test CI. Before pushing, collect all ready task-owned work, fetch and integrate the current remote tip once, and inspect active or queued runs. Avoid overlapping a relevant run unless the change is urgent. If CI fails, diagnose the full failure set and batch locally verified fixes into at most one corrective push. Manual workflow dispatches, reruns, deploys, and other cost-incurring actions remain separately gated unless explicitly included in the current approval.
8. **Behavioral-eval cost ceiling:** live model evals still require explicit current-session approval and the harness approval gate. If that approval names the eval batch but omits a number, use a maximum total ceiling of USD 5 for one batch (never per call), keep the hard nine-call limit, and require the soft-budget acknowledgement for harnesses without provider-enforced caps. A lower user-supplied ceiling wins. Never treat missing cost telemetry as proof of zero cost, and never start a second batch without new approval.
<!-- SEABRIDGE_SAFETY_RULE_END -->

Everything Claude Code (ECC) eklentisi için yaygın sorunlar ve çözümler.

## İçindekiler

- [Bellek ve Context Sorunları](#bellek-ve-context-sorunları)
- [Ajan Harness Hataları](#ajan-harness-hataları)
- [Hook ve İş Akışı Hataları](#hook-ve-i̇ş-akışı-hataları)
- [Kurulum ve Yapılandırma](#kurulum-ve-yapılandırma)
- [Performans Sorunları](#performans-sorunları)
- [Yaygın Hata Mesajları](#yaygın-hata-mesajları)
- [Yardım Alma](#yardım-alma)

---

## Bellek ve Context Sorunları

### Context Window Taşması

**Belirti:** "Context too long" hataları veya eksik yanıtlar

**Nedenler:**
- Token limitlerini aşan büyük dosya yüklemeleri
- Birikmiş konuşma geçmişi
- Tek oturumda birden fazla büyük araç çıktısı

**Çözümler:**
```bash
# 1. Konuşma geçmişini temizle ve yeni başla
# Claude Code kullan: "New Chat" veya Cmd/Ctrl+Shift+N

# 2. Analiz öncesi dosya boyutunu küçült
head -n 100 large-file.log > sample.log

# 3. Büyük çıktılar için streaming kullan
head -n 50 large-file.txt

# 4. Görevleri daha küçük parçalara böl
# Bunun yerine: "50 dosyanın hepsini analiz et"
# Kullan: "src/components/ dizinindeki dosyaları analiz et"
```

### Bellek Kalıcılığı Hataları

**Belirti:** Ajan önceki context veya gözlemleri hatırlamıyor

**Nedenler:**
- Devre dışı bırakılmış sürekli öğrenme hook'ları
- Bozuk gözlem dosyaları
- Proje algılama hataları

**Çözümler:**
```bash
# Gözlemlerin kaydedilip kaydedilmediğini kontrol et
ls ~/.claude/homunculus/projects/*/observations.jsonl

# Mevcut projenin hash id'sini bul
python3 - <<'PY'
import json, os
registry_path = os.path.expanduser("~/.claude/homunculus/projects.json")
with open(registry_path) as f:
    registry = json.load(f)
for project_id, meta in registry.items():
    if meta.get("root") == os.getcwd():
        print(project_id)
        break
else:
    raise SystemExit("Project hash not found in ~/.claude/homunculus/projects.json")
PY

# O proje için son gözlemleri görüntüle
tail -20 ~/.claude/homunculus/projects/<project-hash>/observations.jsonl

# Bozuk bir observations dosyasını yeniden oluşturmadan önce yedekle
mv ~/.claude/homunculus/projects/<project-hash>/observations.jsonl \
  ~/.claude/homunculus/projects/<project-hash>/observations.jsonl.bak.$(date +%Y%m%d-%H%M%S)

# Hook'ların etkin olduğunu doğrula
grep -r "observe" ~/.claude/settings.json
```

---

## Ajan Harness Hataları

### Ajan Bulunamadı

**Belirti:** "Agent not loaded" veya "Unknown agent" hataları

**Nedenler:**
- Eklenti doğru kurulmadı
- Ajan yolu yanlış yapılandırılmış
- Marketplace vs manuel kurulum uyumsuzluğu

**Çözümler:**
```bash
# Eklenti kurulumunu kontrol et
ls ~/.claude/plugins/cache/

# Ajanın var olduğunu doğrula (marketplace kurulumu)
ls ~/.claude/plugins/cache/*/agents/

# Manuel kurulum için ajanlar şurada olmalı:
ls ~/.claude/agents/  # Sadece özel ajanlar

# Eklentiyi yeniden yükle
# Claude Code → Settings → Extensions → Reload
```

### İş Akışı Yürütmesi Takılıyor

**Belirti:** Ajan başlıyor ama hiç tamamlanmıyor

**Nedenler:**
- Ajan mantığında sonsuz döngüler
- Kullanıcı girdisinde takılı
- API'yi beklerken ağ zaman aşımı

**Çözümler:**
```bash
# 1. Takılı işlemleri kontrol et
ps aux | grep claude

# 2. Debug modunu etkinleştir
export CLAUDE_DEBUG=1

# 3. Daha kısa zaman aşımları ayarla
export CLAUDE_TIMEOUT=30

# 4. Ağ bağlantısını kontrol et
curl -I https://api.anthropic.com
```

### Araç Kullanım Hataları

**Belirti:** "Tool execution failed" veya izin reddedildi

**Nedenler:**
- Eksik bağımlılıklar (npm, python, vb.)
- Yetersiz dosya izinleri
- Yol bulunamadı

**Çözümler:**
```bash
# Gerekli araçların kurulu olduğunu doğrula
which node python3 npm git

# Hook scriptlerinin izinlerini düzelt
chmod +x ~/.claude/plugins/cache/*/hooks/*.sh
chmod +x ~/.claude/plugins/cache/*/skills/*/hooks/*.sh

# PATH'in gerekli binary'leri içerdiğini kontrol et
echo $PATH
```

---

## Hook ve İş Akışı Hataları

### Hook'lar Çalışmıyor

**Belirti:** Pre/post hook'lar çalışmıyor

**Nedenler:**
- Hook'lar settings.json'da kayıtlı değil
- Geçersiz hook sözdizimi
- Hook scripti çalıştırılabilir değil

**Çözümler:**
```bash
# Hook'ların kayıtlı olduğunu kontrol et
grep -A 10 '"hooks"' ~/.claude/settings.json

# Hook dosyalarının var olduğunu ve çalıştırılabilir olduğunu doğrula
ls -la ~/.claude/plugins/cache/*/hooks/

# Hook'u manuel olarak test et
bash ~/.claude/plugins/cache/*/hooks/pre-bash.sh <<< '{"command":"echo test"}'

# Hook'ları yeniden kaydet (eklenti kullanıyorsa)
# Claude Code ayarlarında eklentiyi devre dışı bırak ve yeniden etkinleştir
```

### Python/Node Sürüm Uyumsuzlukları

**Belirti:** "python3 not found" veya "node: command not found"

**Nedenler:**
- Python/Node kurulumu eksik
- PATH yapılandırılmamış
- Yanlış Python sürümü (Windows)

**Çözümler:**
```bash
# Python 3'ü kur (eksikse)
# macOS: brew install python3
# Ubuntu: sudo apt install python3
# Windows: python.org'dan indir

# Node.js'i kur (eksikse)
# macOS: brew install node
# Ubuntu: sudo apt install nodejs npm
# Windows: nodejs.org'dan indir

# Kurulumları doğrula
python3 --version
node --version
npm --version

# Windows: python'un (python3 değil) çalıştığından emin ol
python --version
```

### Dev Server Blocker Yanlış Pozitifleri

**Belirti:** Hook, "dev" içeren meşru komutları engelliyor

**Nedenler:**
- Heredoc içeriği pattern eşleşmesini tetikliyor
- Argümanlarda "dev" olan dev olmayan komutlar

**Çözümler:**
```bash
# Bu v1.8.0+'da düzeltildi (PR #371)
# Eklentiyi en son sürüme yükselt

# Geçici çözüm: Dev sunucularını tmux'ta sarmalayın
tmux new-session -d -s dev "npm run dev"
tmux attach -t dev

# Gerekirse hook'u geçici olarak devre dışı bırak
# ~/.claude/settings.json'u düzenle ve pre-bash hook'unu kaldır
```

---

## Kurulum ve Yapılandırma

### Eklenti Yüklenmiyor

**Belirti:** Kurulumdan sonra eklenti özellikleri kullanılamıyor

**Nedenler:**
- Marketplace önbelleği güncellenmedi
- Claude Code sürüm uyumsuzluğu
- Bozuk eklenti dosyaları

**Çözümler:**
```bash
# Değiştirmeden önce eklenti önbelleğini incele
ls -la ~/.claude/plugins/cache/

# Silmek yerine eklenti önbelleğini yedekle
mv ~/.claude/plugins/cache ~/.claude/plugins/cache.backup.$(date +%Y%m%d-%H%M%S)
mkdir -p ~/.claude/plugins/cache

# Marketplace'ten yeniden kur
# Claude Code → Extensions → Everything Claude Code → Uninstall
# Ardından marketplace'ten yeniden kur

# Claude Code sürümünü kontrol et
claude --version
# Claude Code 2.0+ gerektirir

# Manuel kurulum (marketplace başarısız olursa)
git clone https://github.com/affaan-m/everything-claude-code.git
cp -r everything-claude-code ~/.claude/plugins/ecc
```

### Paket Yöneticisi Algılama Başarısız

**Belirti:** Yanlış paket yöneticisi kullanılıyor (pnpm yerine npm)

**Nedenler:**
- Lock dosyası mevcut değil
- CLAUDE_PACKAGE_MANAGER ayarlanmamış
- Birden fazla lock dosyası algılamayı karıştırıyor

**Çözümler:**
```bash
# Tercih edilen paket yöneticisini global olarak ayarla
export CLAUDE_PACKAGE_MANAGER=pnpm
# ~/.bashrc veya ~/.zshrc'ye ekle

# Veya proje bazında ayarla
echo '{"packageManager": "pnpm"}' > .claude/package-manager.json

# Veya package.json alanını kullan
npm pkg set packageManager="pnpm@8.15.0"

# Uyarı: lock dosyalarını kaldırmak kurulu bağımlılık sürümlerini değiştirebilir.
# Önce lock dosyasını commit et veya yedekle, ardından yeni bir kurulum yap ve CI'ı yeniden çalıştır.
# Bunu sadece kasıtlı olarak paket yöneticilerini değiştirirken yap.
rm package-lock.json  # pnpm/yarn/bun kullanıyorsan
```

---

## Performans Sorunları

### Yavaş Yanıt Süreleri

**Belirti:** Ajan yanıt vermek için 30+ saniye sürüyor

**Nedenler:**
- Büyük gözlem dosyaları
- Çok fazla aktif hook
- API'ye ağ gecikmesi

**Çözümler:**
```bash
# Büyük gözlemleri silmek yerine arşivle
archive_dir="$HOME/.claude/homunculus/archive/$(date +%Y%m%d)"
mkdir -p "$archive_dir"
find ~/.claude/homunculus/projects -name "observations.jsonl" -size +10M -exec sh -c '
  for file do
    base=$(basename "$(dirname "$file")")
    gzip -c "$file" > "'"$archive_dir"'/${base}-observations.jsonl.gz"
    : > "$file"
  done
' sh {} +

# Kullanılmayan hook'ları geçici olarak devre dışı bırak
# ~/.claude/settings.json'u düzenle

# Aktif gözlem dosyalarını küçük tut
# Büyük arşivler ~/.claude/homunculus/archive/ altında olmalı
```

### Yüksek CPU Kullanımı

**Belirti:** Claude Code %100 CPU tüketiyor

**Nedenler:**
- Sonsuz gözlem döngüleri
- Büyük dizinlerde dosya izleme
- Hook'larda bellek sızıntıları

**Çözümler:**
```bash
# Kontrolden çıkmış işlemleri kontrol et
top -o cpu | grep claude

# Sürekli öğrenmeyi geçici olarak devre dışı bırak
touch ~/.claude/homunculus/disabled

# Claude Code'u yeniden başlat
# Cmd/Ctrl+Q ardından yeniden aç

# Gözlem dosyası boyutunu kontrol et
du -sh ~/.claude/homunculus/*/
```

---

## Yaygın Hata Mesajları

### "EACCES: permission denied"

```bash
# Hook izinlerini düzelt
find ~/.claude/plugins -name "*.sh" -exec chmod +x {} \;

# Gözlem dizini izinlerini düzelt
chmod -R u+rwX,go+rX ~/.claude/homunculus
```

### "MODULE_NOT_FOUND"

```bash
# Eklenti bağımlılıklarını kur
cd ~/.claude/plugins/cache/ecc
npm install

# Veya manuel kurulum için
cd ~/.claude/plugins/ecc
npm install
```

### "spawn UNKNOWN"

```bash
# Windows'a özgü: Scriptlerin doğru satır sonlarını kullandığından emin ol
# CRLF'yi LF'ye dönüştür
find ~/.claude/plugins -name "*.sh" -exec dos2unix {} \;

# Veya dos2unix'i kur
# macOS: brew install dos2unix
# Ubuntu: sudo apt install dos2unix
```

---

## Yardım Alma

Hala sorunlar yaşıyorsanız:

1. **GitHub Issues'ı Kontrol Edin**: [github.com/affaan-m/everything-claude-code/issues](https://github.com/affaan-m/everything-claude-code/issues)
2. **Debug Logging'i Etkinleştirin**:
   ```bash
   export CLAUDE_DEBUG=1
   export CLAUDE_LOG_LEVEL=debug
   ```
3. **Diagnostic Bilgisi Toplayın**:
   ```bash
   claude --version
   node --version
   python3 --version
   echo $CLAUDE_PACKAGE_MANAGER
   ls -la ~/.claude/plugins/cache/
   ```
4. **Issue Açın**: Debug loglarını, hata mesajlarını ve diagnostic bilgiyi dahil edin

---

## İlgili Dokümantasyon

- [README.md](./README.md) - Kurulum ve özellikler
- [CONTRIBUTING.md](./CONTRIBUTING.md) - Geliştirme rehberleri
- [docs/](../) - Detaylı dokümantasyon
- [examples/](./examples/) - Kullanım örnekleri
