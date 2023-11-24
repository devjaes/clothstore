const Footer = () => {
  return (
    <footer className="mx-auto ">
      <div className='bg-primaryBlack h-32 text-white flex flex-col md:flex-row items-center justify-around mt-10'>
        <div className='text-xl '>Ambivalence</div>

        <div className='flex gap-8 font-thin '>
          <p className="md:block hidden">©Ambivalence 2023</p>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Tiktok</a>
        </div>
        <p className="md:hidden block font-thin text-xs">©Ambivalence 2023</p>
      </div>
    </footer>
  )
};

export default Footer;
