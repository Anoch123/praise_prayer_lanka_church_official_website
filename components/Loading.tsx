export default function ApplicationsLoading() {
  return (
    <div role="status" className="flex min-h-dvh items-center justify-center">
      <span
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-4 border-[#2f62b5]/20 border-t-[#2f62b5] motion-reduce:[animation-duration:2s]"
      />
      <span className="sr-only">Loading applications...</span>
    </div>
  );
}