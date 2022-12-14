import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { AnimateSharedLayout, motion, useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { loadSongByGUID } from '../../Data/DataManager'
import Song from '../../Data/Song/Song'
import SearchPanel from './Components/SearchPanel'
import SheetContainer from './SheetContainer'

export default function SheetsScreen() {

    const [searchExpanded, setExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const animation = useAnimation();

    const params = useParams();
    const [song, setSong] = useState<Song>();

    useEffect(()=>{


        (async () => {
            if(!params.guid){
                setExpanded(true);
                return;
            };
            setSong(await loadSongByGUID(params.guid));
        })();

    },[params]);

    useEffect(()=>{
        if(searchExpanded){
            animation.start("expanded");
        }else{
            animation.start("collapsed");
        }
    },[searchExpanded]);


    const Bar = styled(AppBar)(({theme})=>({
        background: `linear-gradient(68deg, ${theme.palette.primary.main}, ${theme.palette.secondary.dark})`,
        boxShadow: `0px 3px 8px ${grey[500]}`
    }))
    const RightContainer = styled(Box)(({theme})=>({
         position:"fixed"
    }))

    const panelWidth = "25%";

    const variants = {
        collapsed:{
             maxWidth: panelWidth
        },
        expanded:{
             maxWidth: "100%"
        }
    }

    const onSearchChange = (event:any) => {
        setSearchValue(event.target.value);
        if(event.target.value!="")
            setExpanded(true);
    }

    const print = () => {
        window.print();
    }

    return (
        <>
            <Box flexDirection={"column"} height={"100%"}  displayPrint={"none"} sx={{display:{xs:"none", md: "flex"}}}>
                <Bar position='sticky'>
                    <Toolbar variant='dense'>
                        <Box sx={{flexGrow: 1}}>

                        </Box>
                        <Link to={"/create"}>
                            <Button sx={{color:"white"}}>P??idej novou songu</Button>
                        </Link>
                    </Toolbar>
                </Bar>

                <Box display={"flex"} flex={1}>

                    
                <RightContainer marginLeft={panelWidth} width={"100%"} height={"100%"}>
                    <SheetContainer song={song}/>

                    <Button sx={{position: "absolute", left:0,top:0}} onClick={print}>Vytisknout</Button>
                </RightContainer>
                    
                <motion.div variants={variants} initial={"collapsed"} animate={animation} transition={{type:"tween", duration:0.1}}
                        style={{flex:1,
                            display: "flex",
                            boxShadow: `0px 0px 3px ${grey[500]}`,
                            position:"relative"}}>
                    <SearchPanel expanded={searchExpanded} setExpanded={setExpanded} searchValue={searchValue} onSearchChange={onSearchChange} ></SearchPanel>
                </motion.div>
                

                    
                    
                    

                </Box>

                
                

            </Box>

            <Box flexDirection={"column"} height={"100%"}  displayPrint={"none"} sx={{display:{xs:"flex", md: "none"}}}>
                <Bar position='sticky'>
                    <Toolbar variant='dense'>
                        <Box sx={{flexGrow: 1}}>

                        </Box>
                        <Link to={"/create"}>
                            <Button sx={{color:"white"}}>P??idej novou songu</Button>
                        </Link>
                    </Toolbar>
                </Bar>

                <Box flex={1} flexDirection={"column"}>


                    <Box width={"100%"} height={"100%"}>
                        <SheetContainer song={song}/>

                        <Button sx={{position: "absolute", left:0,top:0}} onClick={print}>Vytisknout</Button>
                    </Box>
                        
                    <Box height={"100%"} display={"flex"}>
                        <SearchPanel expanded={searchExpanded} setExpanded={setExpanded} searchValue={searchValue} onSearchChange={onSearchChange} ></SearchPanel>
                    </Box>
                

                    
                    
                    

                </Box>

                
                

            </Box>

            <Box displayPrint={"flex"} display={"none"}>
                <Box width={"100%"} height={"100%"}>

                    <SheetContainer song={song}/>

                </Box>
            </Box>
        </>
        
    )
}
