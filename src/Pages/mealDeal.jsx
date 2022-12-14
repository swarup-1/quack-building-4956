import React from 'react'
import axios from "axios"
import style from "../Styles/MealDeals.module.css"
import Pagination from "../Components/Pagination"
import { useEffect,useState } from 'react'
import { 
  Box,
  Center,
  Input,
  Text,
  Flex,
  Select,
  Button,
  Image,
  SimpleGrid,
  Circle
} from '@chakra-ui/react'
function MealDeal() {
  const [data,setData] = useState([])
  const [total,setTotal] = useState(1)
  const [page,setPage] = useState(1) 
  const [searchLocation,setSearchLocation] = useState("") 


  useEffect(()=>{
    axios.get(`https://kindmeal-3kea.onrender.com/mealDeal`,{
      params:{
        _page:page,
        _limit:searchLocation=="" ? 6 : 40 
      }
    }).then((res)=>{
      if(searchLocation==""){
        setData(res.data)
        setTotal(Math.floor(40/6))
      }else{
        const newData = res.data.filter((el)=>{
          return el.location==searchLocation
        })
        setData(newData)
      }
    })
    .catch((err)=>console.log(err))
  },[page,searchLocation])


  // console.log('data:', data)
  const handlePage =(p)=>{
    setPage(p)
  }
  const handleChange=(p)=>{
    setPage((page)=>page+p)
  }
  console.log('data:', data)
  return (
    <Box background= "linear-gradient(180deg, rgba(255,255,255,1) 52%, rgba(233,233,233,1) 100%)">
      <Center bg="#f0f0f0" mb="20px">
        <Box p="20px" w="80%" >
          <Flex gap={{base:"10px" ,md:"20px"}} flexDirection={{base:"column" ,md:"row"}}>
            <Text fontWeight="500" fontSize="3xl">Meat-Free Deals</Text>
            <Text fontWeight="500" fontSize="2xl" > | </Text>
            <Text fontWeight="500" fontSize="2xl" color="#00000080">Restaurants In Malaysia</Text>
          </Flex>
          <Text fontSize="sm" p="10px 0px">Browse delicious meat-free, vegetarian deals from top restaurants and cafes! Just click on "Get Free Coupon" to obtain instant discounts and dine at the restaurants. No upfront payment, booking or printing is needed. If you share it on social media, you'll even DOUBLE your discount!</Text>
          <Text fontSize="sm" p="10px 0px">Download our mobile app now to easily get coupons and start dining in a few seconds. Effortlessly save lives, health, environment and money now!</Text>
          <Flex gap={{base:"10px" ,md:"30px"}} flexDirection={{base:"column" ,md:"row"}}>
            <Input bgColor="white"placeholder="Search Shop or Deal Name" p="0.5%" variant='unstyled' border="1px solid gray" />
            <Select bgColor="white" onChange={(e)=>setSearchLocation(e.target.value)}>
              <option value="">All Categories</option>
              <option value="2">Pasta</option>
              <option value="3">Burger</option>
              <option value="1">Breakfast</option>
              <option value="5">Bakery</option>
              <option value="4">Cute</option>
              <option value="5"> Tea & Desserts</option>
              <option value="1">Indian</option>
              <option value="2">Chinese</option>
              <option value="Soup">Soup</option>
              <option value="Salads">Salads</option>
            </Select>
            <Select bgColor="white" onChange={(e)=>setSearchLocation(e.target.value)}>
              <option value="">All Locations</option>
              <option value="1">Klang vally</option>
              <option value="2">Kualalumpur</option>
              <option value="3">Petaling Jaya</option>
              <option value="4">Ipoh</option>
              <option value="5">Bangsar</option>
              <option value="4">Cheras</option>
              <option value="2">Perek</option>
              <option value="1">Sepang</option>
              <option value="5">Taman Desa</option>
              <option value="3">Subang</option>
            </Select>
            <Button p="10px 80px" colorScheme='red' color="white">Search Deals</Button>
            <Button p="10px 80px" colorScheme='green' color="white">Browse Restaurants</Button>
          </Flex>
        </Box>
      </Center>
      <Box align="center"><Image src="https://www.kindmeal.my/images/ads/banner_janegoodall_message.jpg" alt="meals_footer_image" /></Box>

      <Pagination  totalPages={total} currentPage={page} handlePage={handlePage} handleChange={handleChange} />
      <Center mb="50px">
        <SimpleGrid columns={{sm:1, md:2}} spacing='50px' w="75%">
        {data && data.map((item)=>(
          <Box key={item.dealid}  rounded={20} boxShadow='lg'  h='90vh' position='relative' bg='white' >
                            <Image src={item.dealphoto_large} className={style.mainimage} />
                            <Text className={style.name}> {item.dealname} </Text>
                            <Circle className={style.circle}> -{item.dealdiscount1} </Circle>

                            <Text
                            textAlign='left'
                            fontSize='1.5vw'
                            m={2}
                            color='#666666'> {item.shopname_short} </Text>

                            <Text 
                            dangerouslySetInnerHTML={{__html:item.dealdesc}}  
                            h='9%' 
                            overflow='hidden' 
                            textAlign='left'
                            m={2} /> 

                            <Flex justifyContent='space-between' alignItems='center' >
                                <Button bg='red.500' color='#fff' m={2} > Get FREE Coupon </Button>
                                <Flex gap={2} >
                                    <Image w='10%' src='https://www.kindmeal.my/images/icon_star.png'  />
                                    <Image w='10%' src='https://www.kindmeal.my/images/icon_star.png'  />
                                    <Image w='10%' src='https://www.kindmeal.my/images/icon_star.png'  />
                                    <Image w='10%' src='https://www.kindmeal.my/images/icon_star.png'  />
                                    <Image w='10%' src='https://www.kindmeal.my/images/icon_star_grey.png' />
                                </Flex>
                            </Flex>
                            
                            <Box mt={1} pt='1' borderTop='1px' borderColor='gray.500'   >
                                <Flex justifyContent='space-around'>
                                    <Flex gap={3} ml={3}   >
                                        <img src="https://www.kindmeal.my/images/icon_egg.png" alt=""  width='25%' height='80%' /> 
                                        <img src="https://www.kindmeal.my/images/icon_milk.png" alt="" width='25%' height='80%' />    
                                        <img src="https://www.kindmeal.my/images/icon_alcohol.png" alt="" width='25%' height='80%' /> 
                                    </Flex>
                                    <Flex flexDirection='column'borderLeft='1px' borderRight='1px' borderColor='gray.500' pr={7} pl={7}  >
                                        <Text fontSize='0.9vw' > KindMeal Discount </Text>
                                        <Text fontSize='1.1vw'color='red' > {item.dealprice2} </Text>
                                    </Flex>
                                    <Flex flexDirection='column' >
                                        <Text fontSize='1.1vw'  dangerouslySetInnerHTML={{__html:item.dealexpiry}}  ></Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Box> 
        ))}
        </SimpleGrid>
      </Center>
      <Pagination  totalPages={total} currentPage={page} handlePage={handlePage} handleChange={handleChange} />

      <Box bgColor="gray.100" >
          <Box align="center"><Image src="https://www.kindmeal.my/images/how_kindmeal_works.png" alt="meals_footer_image" /></Box>
      </Box>
    </Box>
  )
}

export default MealDeal