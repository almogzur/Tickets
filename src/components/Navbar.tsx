import Link from 'next/link';
import Image from 'next/image'

import { Flex, Heading } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <nav>
      <Link href="/"> 
        <Flex p={4}  >
          <Image src="/logo.png" alt="site logo" width={40} height={30} />
          <Heading className="logo-text">הזמנת כרטיסים  דף הבית </Heading>
        </Flex>
      </Link>

    </nav>
);
}
 
export default Navbar;