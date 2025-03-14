import Image from 'next/image';
const CompJoao = () => {
    return(
        <>
            <div className="pt-20">
                <div className="flex justify-center">
                    <Image className='rounded-[10rem] border-4 border-[#736D6D]'
                        src="/foto_joao.jpg"
                        alt="Foto de João"
                        width={255}
                        height={0}
                        priority
                    />
                </div>
                <h1 className="text-[24px] font-semibold pt-5">João dos Santos</h1>
                <span className="text-[18px]">RM560400</span>
            </div>
        </>
    )
}
export default CompJoao;