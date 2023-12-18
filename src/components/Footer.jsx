function Footer(props) {
    return (
        <div className={`w-full flex justify-center mt-auto`}>
            <div className="w-[90%] flex justify-between items-center py-4
             md:flex-row flex-col gap-4">
                {/* Footer 좌측 */}
                <div className="flex md:justify-start justify-between gap-2 items-center text-start text-xs md:w-auto w-full">
                    <div>
                        &copy; AIVLE 4기 빅프로젝트 19조
                    </div>
                    {/*  */}
                </div>

                {/* Footer 우측 */}
                <div className="flex justify-end items-center gap-3 md:w-auto w-full">
                    <a href="#" target="_blank">
                        {/* <FaGithub size={30} /> */}
                        여기에깃허브아이콘
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Footer;