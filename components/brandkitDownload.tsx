const DownloadBrandkitButton = () => {
  return (
    <div className="w-full flex justify-center mt-8">
  <a
    href="/images/brandkitMain.zip"
    download
    className="
      inline-flex items-center gap-2
      bg-[#F33736] text-white font-semibold
      px-5 py-3 rounded-xl 
      shadow-sm
      transition transform duration-200
      hover:opacity-90 hover:-translate-y-0.5
    "
  >
    Download Brandkit
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
    </svg>
  </a>
</div>

  );
};

export default DownloadBrandkitButton;
