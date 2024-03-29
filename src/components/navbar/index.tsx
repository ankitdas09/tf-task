const CNavBar = () => {
    return (
        <nav className="flex justify-between py-4">
            <div className="flex items-center">
                <span>
                    <img src="TF logo.svg" alt="logo" />
                </span>
                <button className="ms-[40px] me-[20px] rounded-bottom-border">
                    <div className='flex items-center'>
                        <img src="metrics.png" alt="metrics icon" className="w-3 h-full inline-block me-1" />
                        Metrics
                    </div>
                </button>
                <button className="items-center rounded-bottom-border">
                    <div className='flex items-center'>
                        <img src="list-active.png" alt="metrics icon" className="w-3 h-full inline me-1" />
                        Logs
                    </div>
                </button>
            </div>
            <span>Menu</span>
        </nav>
    );
};

export default CNavBar;
