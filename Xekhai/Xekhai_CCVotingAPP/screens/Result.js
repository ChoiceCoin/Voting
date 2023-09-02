import React from "react";
import {View, NativeBaseProvider, Button, VStack, Text, HStack} from "native-base";
import { useState } from "react";
import { ScrollView, Box, Center } from "native-base";
import {
    BarChart,
} from "react-native-chart-kit";
import {Dimensions} from "react-native";
import axios from "axios";

export function Results({ navigation }) {

    const [loading, setLoading] = useState(true);
    const [n1, setn1] = useState(0);


    const baseUrl = '';

    let count1
    let count2
    let data
    let data2

    async function go(id){

        await  axios({
            method: 'get',
            url: `${baseUrl}/count`
        }).then((response) => {
            console.log(response.data);
            let str = response.data

            let position = str.search(",");

            count1 = str.slice(0 , position)
            count2 = str.slice(position+1)

                setn1([count1,count2])

            console.log(`${count1} ${count2}`)

            setLoading(false)

        }).finally(console.log('Done'));

    }

    if(n1 == 0){
        go().finally(()=>{
        })
    }
    console.log(n1)


    data = {
        labels: ["John Smith", "Sarah Palmer", ""],
        datasets: [
            {
                data: [n1[0], n1[1], 0]
            }
        ]
    };

    data2 = [
        {
            name: "John Smith",
            population: n1[0],
            color: "rgba(0, 0, 0, 1)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Sarah Palmer",
            population: n1[1],
            color: "#a3a3a3",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }]

    const chartConfig={
        backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
            borderRadius: 16
        }
    }

    if(loading){
        return (
            <NativeBaseProvider>
                <VStack w={'100%'} h={'100%'} justifyContent={'center'} alignItems={'center'}>
                    <Button isLoading={true}>Loading</Button>
                </VStack>
            </NativeBaseProvider>
        )
    }
    return(
        <NativeBaseProvider>
            <ScrollView bg={'#fff'}>
             <VStack pt={10} px={5} space={5}>
                 <Button variant={'link'} onPress={()=>{
                navigation.navigate("Home")
            }}>
                Go Back
            </Button>
                 <View>
                     <Text fontWeight={'bold'}>Bar Chart</Text>
                 </View>
                 <BarChart
                     style={{}}
                     data={data}
                     width={Dimensions.get("window").width}
                     height={Dimensions.get("window").width}
                     yAxisLabel=""
                     chartConfig={chartConfig}
                     verticalLabelRotation={30}
                 />
{/*<HStack alignContent={'center'} justifyContent={'center'} w={'100%'} space={5}>*/}
{/*    <Box bg={'#000'} h={5} w={5} rounded={'full'}></Box>*/}
{/*<Text>John Smith</Text>*/}
{/*</HStack>*/}
{/*<HStack alignContent={'center'} justifyContent={'center'} w={'100%'} space={5}>*/}
{/*    <Box bg={'#a3a3a3'} h={5} w={5} rounded={'full'}></Box>*/}
{/*<Text>Sarah Palmer</Text>*/}
{/*</HStack>*/}

             </VStack>
            </ScrollView>
        </NativeBaseProvider>
    )
}