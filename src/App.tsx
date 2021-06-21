import React, {useEffect, useState} from 'react';
import './App.css';
import AirHttp from "./services/air.http";
import {Box, Grid, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import moment from "moment/moment";
import InvertColorsIcon from '@material-ui/icons/InvertColors';

const airHttp = AirHttp.getInstance()


const useStyles = makeStyles(theme => ({
    rain: {
        minWidth: '100%',
        minHeight: '100vh',
        //backgroundColor: '#35baf6',
        //backgroundImage: `url(https://3.bp.blogspot.com/-PyLlGSnX8vk/W8XH9eB12vI/AAAAAAADoIQ/mm4frv5dNW0gDzUOtjS6cNa2veuZN2eigCLcBGAs/s640/gif-lluvia-7.gif)`,
        backgroundImage: `url(https://thumbs.gfycat.com/EmbarrassedObedientIncatern-size_restricted.gif)`,
        //backgroundImage: `url(https://i.gifer.com/fyDi.gif)`,
        //backgroundImage: `url(https://i.gifer.com/1pX9.gif)`,
        //backgroundImage: `url(https://wallegend.net/gif/429.gif)`,
        backgroundSize: 'cover',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },
    sunny: {
        minWidth: '100%',
        minHeight: '100vh',
        //backgroundImage: `url(https://i.gifer.com/Lx0q.gif)`,
        backgroundImage: `url(https://i.gifer.com/g1vA.gif)`,
        backgroundSize: 'cover',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(3)
    },

    img: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemDown: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    subItemDown: {
        //borderBottom: '1px  solid #fff',
        padding: theme.spacing(5),
    },
    subItemDown2: {
        padding: theme.spacing(5),
    },
    icon: {
        alignItems: 'up'
    },
    footer: {
        position: 'fixed',
        left: 0,
        bottom: 0,
        width: '100%',
        padding: theme.spacing(1)
    },
    header: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: theme.spacing(1)
    },
    header2: {
        position: 'absolute',
        top: 0,
        left: 0,
        padding: theme.spacing(1)
    },
    borderContainer: {
        padding: theme.spacing(0.5),
        border: '0.1rem solid #fff',
        borderRadius: 10
    }
}))

function App() {
    const [nearestCity, setNearestCity] = useState<any>({})
    const classes = useStyles();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.down('sm'));
    const handleInit = async () => {
        const data = await airHttp.getNearestCity()
        setNearestCity(data)
    }
    const isRain = nearestCity.current?.weather?.hu >= 50;

    useEffect(() => {
        handleInit()
    }, [])

    return (
        <Grid container className={isRain ? classes.rain : classes.sunny}>
            <Grid item xs={12} md={6}>
                <Grid item xs={12}>
                    <Typography variant='h1' align="center">
                        {nearestCity.city}
                    </Typography>
                </Grid>
                <Grid container className={classes.borderContainer}>
                    <Grid item xs={12}>
                        <Typography align="center" variant='h6'>
                            {moment(nearestCity.current?.weather?.ts).format('LLLL')}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h1' align="center">
                            {nearestCity.current?.weather?.tp}°
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box className={classes.img}>
                            <img src={`https://airvisual.com/images/${nearestCity.current?.weather?.ic}.png`}
                                 width={isSm ? 200 : 300} height={isSm ? 200 : 300} alt=""/>
                        </Box>
                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <InvertColorsIcon className={classes.icon}/><br/>
                            <span>Hu</span> <br/> {nearestCity.current?.weather?.hu} %
                        </div>
                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <span className="material-icons">air</span><br/>
                            <span>Ws</span> <br/>{nearestCity.current?.weather?.ws} m/s
                        </div>

                    </Grid>
                    <Grid item xs={4} className={classes.itemDown}>
                        <div className={classes.subItemDown}>
                            <span className="material-icons">ac_unit</span> <br/>
                            <span>Pr</span> <br/>{nearestCity.current?.weather?.pr} hpa
                        </div>
                    </Grid>
                    <div className="footer flex">

                    </div>
                    <Grid item xs={12}>
                        <Typography align="center" className={classes.subItemDown2}>
                            Your Location is: {nearestCity.location?.coordinates}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item className={classes.header2}>
                <Typography variant='h2'>
                    {nearestCity.country}
                </Typography>
            </Grid>
            <Grid item className={classes.header}>
                <Typography variant="h6">Weather Application</Typography>
            </Grid>
            <Grid item className={classes.footer}>
                <Typography variant="h6">Power by - AirVisual API / Mike</Typography>
            </Grid>

        </Grid>
    );
}

export default App;