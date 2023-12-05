import React, { useState } from "react";
import {View,Text,TouchableOpacity,StyleSheet,SafeAreaView} from "react-native";

const SearchTry=()=>{

    const [status,setstatus]=useState("All")
    const statusFilter=status=>{
        setstatus(status)
    }
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.btnContainer}>
            {/* <View style={styles.btn}>
                <Text style={styles.btnText}>Hot</Text>

            </View> */}

            {
                btnlistData.map((i)=>(
                    <TouchableOpacity style={[styles.btn, status===i.name&&styles.btnActive]} 
                    onPress={()=>statusFilter(i.name)}>
                <Text style={styles.btnText}>{i.name}</Text>
            </TouchableOpacity>

                ))
            }

        </View>
        </SafeAreaView>
    )

}
export default SearchTry


const styles=StyleSheet.create({
    View:{
        width:100,
        height:100,
        backgroundColor:"black",
        position:"absolute",
        marginTop:20,
    },
    btnContainer:{
        // flex:1,
        flexDirection:"row",
        // backgroundColor:"black",
        marginTop:50,
        marginLeft:19,

    },
    btn:{
        width:119,
        height:43,
        backgroundColor:"#FFFFFF",
        borderRadius:7,
        borderColor:"#DADADA",
        borderWidth:1,
        justifyContent:"center",
        marginRight:10,

    },
    btnActive:{
        borderColor:"#FFB90A",
        backgroundColor:"#FBEEC4"

    },
    btnText:{
        fontWeight:"400",
        fontSize:14,
        alignSelf:"center",
        color:"#332F2E",

    },

    container:{
        flex:1,
        backgroundColor:"#ffffff",
        paddingHorizontal:10,
        // justifyContent:"center",
    }
    
})


const btnlistData=[
    {
        name:"Hot",

    },
    {
        name:"Cold"
    }
]