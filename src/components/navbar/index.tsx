const CNavBar = () => {
    function handleDropdownToggle() {
        const container = document.getElementById("dropdown-item-container");
        container?.classList.toggle("hidden");
    }
    return (
        <nav className="flex justify-between py-4">
            <div className="flex items-center">
                <span>
                    <img src="TF logo.svg" alt="logo" />
                </span>
                <button className="ms-[40px] me-[20px] rounded-bottom-border">
                    <div className="flex items-center">
                        <img
                            src="metrics.png"
                            alt="metrics icon"
                            className="w-3 h-full inline-block me-1"
                        />
                        Metrics
                    </div>
                </button>
                <button className="items-center rounded-bottom-border">
                    <div className="flex items-center">
                        <img
                            src="list-active.png"
                            alt="metrics icon"
                            className="w-3 h-full inline me-1"
                        />
                        Logs
                    </div>
                </button>
            </div>
            <div className="relative">
                <div
                    onClick={handleDropdownToggle}
                    className="border rounded-md text-xs font-sans px-2 py-2 text-[#3E5680] font-medium cursor-pointer"
                >
                    Last 5 minutes
                    <img src="chevron.svg" alt="" className="inline w-[10px] mb-[3px] ms-[6px]" />
                </div>
                <div
                    id="dropdown-item-container"
                    className="hidden cursor-pointer font-medium rounded border-[0.3px] border-[#E0ECFD] bg-white absolute top-10 left-0 z-10 text-[14px] text-slate-900 w-[123%] drop-shadow-md"
                >
                    <div className="border-b-[1px] p-2 flex justify-between hover:bg-gray-300">
                        Last 5 minutes{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                    <div className="border-b-[1px] border-[#E0ECFD] p-2 flex justify-between hover:bg-gray-300">
                        Last 15 minutes{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                    <div className="border-b-[1px] border-[#E0ECFD] p-2 flex justify-between hover:bg-gray-300">
                        Last 30 minutes{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                    <div className="border-b-[1px] border-[#E0ECFD] p-2 flex justify-between hover:bg-gray-300">
                        Last 1 hour{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                    <div className="border-b-[1px] border-[#E0ECFD] p-2 flex justify-between hover:bg-gray-300">
                        Last 3 hours{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                    <div className="pb-2 flex justify-between p-2 border-[#E0ECFD] hover:bg-gray-300">
                        Last 6 hours{" "}
                        <img src="Icon.svg" alt="" className="inline w-[10px] mb-[2px] ms-[6px]" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default CNavBar;
