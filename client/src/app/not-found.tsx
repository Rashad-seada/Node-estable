import Link from "next/link"

function NotFoundPage() {
    return (
        <div className="w-full h-[100vh] flex justify-center items-center">
            <div className="w-[95vw] flex justify-center items-center rounded-xl h-[92vh] bg-smokey-white">
                <div className="flex w-[600px] flex-col justify-between items-center">
                    <img src="/svgs/404.svg" alt="no connection img" className="w-[250px]" />
                    <p className='text-dark-grey text-xl font-semibold'>
                        <span className="text-primary">404 </span>
                         , the page does not exist
                    </p>
                    <p className='text-md mt-3 text-light-grey text-center'>
                        It seems that you have found something you are looking for 
                        that is no longer available , There may be an error in the link 
                        or the page has been removed
                    </p>
                    <Link href="/" className="text-smokey-white mt-10 w-[350px] flex text-xl justify-center items-center h-[60px] bg-primary rounded-2xl">
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage