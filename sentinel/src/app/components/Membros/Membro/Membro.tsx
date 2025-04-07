import Image from 'next/image';

export default function item() {
    const lista = [
        {
            "name": "Kauê Samartino",
            "photo": "/kaue.jpg",
            "rm": "559317",
            "alt": "foto de Kauê"
        }, {
            "name": "Davi Praxedes",
            "photo": "/xeds.jpg",
            "rm": "560719",
            "alt": "foto de Davi"
        }, {
            "name": "João dos Santos",
            "photo": "/foto_joao.jpg",
            "rm": "560400",
            "alt": "foto de João"
        }
    ]

    return (
        <div className="pt-30 lg:pt-20 2xl:pt-40 lg:flex md:flex md:justify-center md:gap-14 lg:gap-28">
            {lista.map((integrante, index) => (
                <div key={index}>
                    <div className="flex justify-center">
                        <Image className='rounded-[10rem] border-4 border-[#736D6D]'
                            src={integrante.photo}
                            alt={integrante.alt}
                            width={255}
                            height={0}
                            priority
                        />
                    </div>

                    <div className="md:content-center">
                        <h1 className='text-[24px] font-semibold pt-5'>{integrante.name}</h1>
                        <span className='text-[18px]'>{integrante.rm}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

/*
<div className="pt-30 lg:pt-20 2xl:pt-40 lg:block md:flex md:justify-center md:gap-14">
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
*/