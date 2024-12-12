
import logo from './img/Black & White Minimalist Aesthetic Initials Font Logo.png'
import face from '../anh/Facebook.png'
import insta from '../anh/Instagram.png'
import chim from '../anh/Twitter.png'
import linkk from '../anh/LinkedIn.png'
type Props = {}

const Footer = (props: Props) => {
  return (
    <>
    <div className='w-full border-t-2 border-black pt-[100px] mt-[50px] '>
  <div className='pl-[20px] px-[10px] pb-[70px] pl-[150px] w-full flex text-black'>
    <div className="logo w-[100px]">
      <img className='w-full' src={logo} alt="" />
    </div>
    <div className="category1 w-[100px] ml-[140px]">
      <p className='pb-[10px] font-bold'>Categories</p>
      <p className='pb-[10px]'>Wall art</p>
      <p className='pb-[10px]'>Vase</p>
      <p className='pb-[10px]'>Tea</p>
      <p className='pb-[10px]'>Chair</p>
      <p className='pb-[10px]'>Basket</p>
    </div>
    <div className="category2 w-[100px] ml-[140px] mt-[30px]">
      <p className='pb-[10px]'>Bed table</p>
      <p className='pb-[10px]'>Armchair</p>
      <p className='pb-[10px]'>Ficus</p>
      <p className='pb-[10px]'>Desk decor</p>
      <p className='pb-[10px]'>Cactus</p>
    </div>
    <div className="About w-[100px] ml-[140px]">
      <p className='pb-[10px] font-bold'>About</p>
      <p className='pb-[10px]'>Contact Us</p>
      <p className='pb-[10px]'>About US</p>
      <p className='pb-[10px]'>Help</p>
      <p className='pb-[10px]'>FAQ</p>
      <p className='pb-[10px]'>Term</p>
    </div>
    <div className="Subcribe w-[500px] ml-[140px]">
      <p className='font-bold pb-[10px]'>Subscribe</p>
      <p className='py-[10px]'>Join our newsletter to stay up to date on features and releases..</p>
      <div className="w-full text-center">
        <form action="#">
          <div className="max-w-s flex">
            <input
              type="email"
              placeholder="yourmail@example.com"
              className="flex px-[60px] mr-[20px] appearance-none rounded shadow text-grey-dark focus:outline-none"
            />
            <button
              type="submit"
              className="border-2 border-black px-[30px] rounded-md shadow-md hover:bg-indigo-600 p-3"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <p className='pt-[15px]'>By subscribing you agree to our Privacy Policy and <br/> provide consent to receive updates from our company.</p>
    </div>
  </div>

  <div className="foot pt-[100px] pb-[50px] border-t-2 border-black w-full flex justify-between px-[20px]">
    <div className="text flex gap-5">
      <p>2024 Relume. All right reserved.</p>
      <a href="#">Privacy Policy</a>
      <a href="#">Term of Service</a>
      <a href="#">Cookies Setting</a>
    </div>
    <div className="icon flex gap-3">
      <img src={face} alt="" />
      <img src={insta} alt="" />
      <img src={chim} alt="" />
      <img src={linkk} alt="" />
    </div>
  </div>
</div>

    
    </>


    )
}

export default Footer