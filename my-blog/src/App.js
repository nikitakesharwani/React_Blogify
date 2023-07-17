import './App.css';
import NavBar from './NavBar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import NotfoundPage from './pages/NotFoundPage';




function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <div className="page-body">
        
          <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/article/:articleID" element={<ArticlePage/>}/>
            <Route path="/about"  element={<AboutPage/>}/>
            <Route path="/articles"  element={<ArticlesListPage/>}/>
            <Route path="*" element= {<NotfoundPage />} />
          </Routes>     
      </div>
    </BrowserRouter>
    
  );
}

export default App;
