const HeaderLogo = () => {
    return(
        <div className="flex justify-center items-center gap-3">
            <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
                <p className="font-bold text-2xl text-white">FT</p>
                
            </div>
            <h1 className="font-bold">
                <span className="text-textDark text-xl">Faso</span>
                <span className="text-primary text-xl">Tour</span>
            </h1>
        </div>
    )
}

export default HeaderLogo;