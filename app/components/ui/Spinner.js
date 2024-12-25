import Image from "next/image";

export default function Spinner({ size = 100, alt = "Загрузка..." }) {
  return (
    <div className="flex justify-center items-center">
      <Image alt={alt} src="/Spinner.svg" height={size} width={size} priority={true}/>
    </div>
  );
}
