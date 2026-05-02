import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Card, CardContent, Typography, Container, Grid } from '@mui/material';
import { Create, Public, People } from '@mui/icons-material';
import '../styles/LandingPage.css';

const LandingPage = () => {
    const hist = useHistory();

    const features = [
        {
            icon: <Create />,
            title: 'Write',
            description: 'Express your thoughts and ideas with our clean, distraction-free editor.'
        },
        {
            icon: <Public />,
            title: 'Share',
            description: 'Publish your stories to the world or keep them private for yourself.'
        },
        {
            icon: <People />,
            title: 'Discover',
            description: 'Explore diverse perspectives and connect with fellow writers.'
        }
    ];

    return (
        <div className="landing">
            <div className="landing-hero">
                <div className="hero-bg"></div>
                <div className="hero-content">
                    <Typography variant="h1" className="landing-title">
                        MindScribe
                    </Typography>
                    <Typography variant="h5" className="landing-slogan">
                        Discover, Reflect, Connect
                    </Typography>
                    <div className="hero-buttons">
                        <Button
                            variant="contained"
                            className="btn-primary"
                            onClick={() => hist.push('/register')}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            className="btn-secondary"
                            onClick={() => hist.push('/signIn')}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            </div>

            <Container maxWidth="lg" className="features-section">
                <Grid container spacing={4} justifyContent="center">
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={4} key={index}>
                            <Card className="feature-card">
                                <CardContent>
                                    <div className="feature-icon">{feature.icon}</div>
                                    <Typography variant="h6" className="feature-title">
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" className="feature-description">
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}

export default LandingPage;
