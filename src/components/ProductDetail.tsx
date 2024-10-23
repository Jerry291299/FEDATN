import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Iproduct } from '../interface/products';
import { Icategory } from '../interface/category';
import { getProductByID } from '../service/products';
import { getCategoryByID } from '../service/category';
import Header from './Header';
import LoadingComponent from './Loading';
import Footer from './Footer';
import anh12 from './img/sofa6.jpeg';
import anh13 from './img/sofa5.jpeg';
import anh15 from './img/sofa3.jpeg';
import anh16 from './img/sofa4.jpeg';

type Props = {}

const ProductDetail = (props: Props) => {
    const [product, setProduct] = useState<Iproduct | null>(null); 
    const [category, setCategory] = useState<Icategory | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Lấy id sản phẩm từ URL
    const { id } = useParams<{ id: string }>(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const sanpham = await getProductByID(id); 
                const danhmuc = await getCategoryByID();
                setProduct(sanpham);
                setCategory(danhmuc);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]); 
    if (loading) return <LoadingComponent />;

    return (
        <>
            <Header />
            <div className='container mx-auto w-[1400px] pt-[100px]'>
                {product && (
                    <div className='container mx-auto w-[1300px] flex'>
                        <div className=''>
                            <img className='mb-[20px] w-[150px]' src={product.img} alt={product.name} />
                            <img className='mb-[20px] w-[150px]' src={product.img} alt={product.name} />
                            <img className='mt-[10px] w-[150px]' src={product.img} alt={product.name} />
                            <img className='mt-[10px] w-[150px]' src={product.img} alt={product.name} />
                        </div>
                        <div className='ml-[40px]'>
                            <img className='w-[650px] object-cover' src={product.img} alt={product.name} />
                        </div>
                        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
                            <h1 className="text-xl font-bold text-black-800">{product.name}</h1>
                            <p className="font-bold text-gray-500">SKU: (ĐANG CẬP NHẬT...)</p>
                            <div className="my-4">
                                <div className="flex items-baseline">
                                    <span className="text-2xl font-semibold text-black-600">{product.price}₫</span>
                                    <p className="text-gray-500 m-[15px]">Giá thị trường:
                                        <span className="text-gray-400 line-through ml-2">1.000.000₫</span>
                                    </p>
                                </div>
                                <p className="font-bold text-gray-600">Tiết kiệm: 
                                    <span className="text-red-600">50.000₫</span>
                                </p>
                                <p className="font-bold text-gray-500 mt-2">Tình trạng: 
                                    <span className="font-semibold text-red-600">Hết hàng</span>
                                </p>
                            </div>
                            <button className="w-full py-2 bg-gray-500 text-white font-semibold rounded-lg cursor-not-allowed" disabled>
                                HẾT HÀNG
                            </button>
                            <div className="my-4 font-bold">
                                <p className="text-gray-700">Gọi đặt mua: 
                                    <a href="tel:0829721097" className="text-blue-600"> 0829721097</a> 
                                    <span className="text-gray-600">(miễn phí 8:30 - 21:30)</span>
                                </p>
                            </div>
                            <ul className="list-disc pl-5 space-y-2 text-gray-700">
                                <li>MIỄN PHÍ VẬN CHUYỂN VỚI ĐƠN HÀNG <a className='font-bold'>từ 10.000.000Đ</a></li>
                                <li>BẢO HÀNH  <a className='font-bold'>1 đổi 1</a> DO LỖI NHÀ SẢN XUẤT</li>
                                <li>CAM KẾT  <a className='font-bold'>100% chính hãng</a></li>
                            </ul>
                        </div>
                    </div>
                )}
                <div className='pt-[90px]'>
                    <h1 className="text-4xl font-bold mb-[10px]">Other Products</h1>
                    <div className='pt-[10px] grid grid-cols-4 gap-4'>
                        <div className="pt-[40px]">
                            <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
                            <div className="flex">
                                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                                <p className="text-[20px] font-bold pl-[110px]">$55</p>
                            </div>
                            <p>Bed table</p>
                            <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
                        </div>
                        <div className="pt-[40px]">
                            <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
                            <div className="flex">
                                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                                <p className="text-[20px] font-bold pl-[110px]">$55</p>
                            </div>
                            <p>Bed table</p>
                            <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
                        </div>
                        <div className="pt-[40px]">
                            <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
                            <div className="flex">
                                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                                <p className="text-[20px] font-bold pl-[110px]">$55</p>
                            </div>
                            <p>Bed table</p>
                            <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
                        </div>
                        <div className="pt-[40px]">
                            <img className="w-[100%]" src={anh16} alt="Round Dining Table" />
                            <div className="flex">
                                <h2 className="text-[18px] font-bold">Round Dining Table</h2>
                                <p className="text-[20px] font-bold pl-[110px]">$55</p>
                            </div>
                            <p>Bed table</p>
                            <button className="border-2 border-black rounded-lg py-[5px] px-[125px] mt-[10px]">Add to cart</button>
                        </div>
                        

                        {/* Các sản phẩm khác */}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ProductDetail;
