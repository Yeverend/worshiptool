import { Box, Typography } from "@mui/material"
import React from "react"
import {Section} from "../Components/SheetComponent"
import Song from "../Data/Song/Song"

export default function LightStyle(song:Song, sections: Section[]){
    
    const font = "Source Sans Pro";

    return (
        <Box fontFamily={font}>
            <Box display={"flex"} flexDirection={"row"} gap={1} sx={{marginBottom:1}}>
                    <Box flex={1}></Box>
                    <Box flex={5}>
                    <Typography variant='h5' fontFamily={"inherit"}><b>{song.name}</b></Typography>
                    {song.creators.map((creator)=>{
                        return(
                        <Typography variant='subtitle2' fontFamily={"inherit"}><>{creator.type}</>: {creator.name}</Typography>      
                        )
                    })}
                    
                    </Box>
            </Box>
            {sections.map((section: Section, index) => {
                return (
                <Box display={"flex"} flexDirection={"row"} gap={1} marginBottom={3} key={"abox"+index}>
                    <Box flex={1}>
                    <Typography variant={"subtitle2"} marginTop={"1.5rem"} textAlign={"end"} fontFamily={"inherit"}>{section.name}{section.name==""?"":":"}</Typography>
                    </Box>
                    <Box flex={5}>
                        {section.lines&&section.lines.map((line, index)=>{
                        return (
                            <Box display={"flex"} flexDirection={"row"}  key={"bbox"+index}>
                            {line.segments.map((segment, index)=>{
                                return(
                                    <Box display={"flex"} flexDirection={"column"}  key={"cbox"+index}>
                                        <Box sx={{flex:1}}>
                                            {segment.chord&&<Typography sx={{paddingRight: 1}} fontFamily={"inherit"}><b>{segment.chord}</b></Typography>}
                                        </Box>
                                        
                                        <Typography sx={{flex:1}} fontFamily={"inherit"}>{segment.text}</Typography>
                                    </Box>
                                )
                            })}
                            </Box>
                        )
                        })}
                    </Box>
                </Box>
                )
            })}
        </Box>
    )
}