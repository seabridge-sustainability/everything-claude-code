export function ExportButton({ exportReport }: { exportReport: () => Promise<void> }) {
  async function handleClick() {
    await exportReport();
  }

  return (
    <button onClick={handleClick}>
      <DownloadIcon />
    </button>
  );
}
