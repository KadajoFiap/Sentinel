import Image from 'next/image';
const CompDavi = () => {
    return (
        <>
            <div className="pt-30 lg:pt-20 2xl:pt-40 lg:block md:flex md:justify-center md:gap-14">
                <div className="flex justify-center">
                    <Image className='rounded-[10rem] border-4 border-[#736D6D]'
                        src="/xeds.jpg"
                        alt="Foto de Davi"
                        width={255}
                        height={0}
                        priority
                    />
                </div>
                <div className="md:content-center">
                    <h1 className="text-[24px] font-semibold pt-5">Davi Praxedes</h1>
                    <span className="text-[18px]">RM560719</span>
                </div>
            </div>
        </>
    )
}
export default CompDavi;