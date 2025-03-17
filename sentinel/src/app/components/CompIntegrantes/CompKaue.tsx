import Image from 'next/image';
const CompKaue = () => {
    return (
        <>
            <div className="pt-30 2xl:pt-40 lg:block md:flex md:justify-center md:gap-14">
                <div className="flex justify-center">
                    <Image className='rounded-[10rem] border-4 border-[#736D6D]'
                        src="/kaue.jpg"
                        alt="Foto de Kauê"
                        width={255}
                        height={0}
                        priority
                    />
                </div>
                <div className="md:content-center">
                    <h1 className="text-[24px] font-semibold pt-5">Kauê Samartino</h1>
                    <span className="text-[18px]">RM559317</span>
                </div>
            </div>
        </>
    )
}
export default CompKaue;