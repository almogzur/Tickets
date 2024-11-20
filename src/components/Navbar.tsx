import Link from 'next/link';
import Image from 'next/image'

const Navbar = () => {
  return (
    <nav>
      <Link href="/"> 
        <div className="logo">
          <Image src="/logo.png" alt="site logo" width={40} height={30} />
          <span className="logo-text">הזמנת כרטיסים  דף הבית </span>
        </div>
      </Link>

    </nav>
);
}
 
export default Navbar;