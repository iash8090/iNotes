import "./App.css";
import Header from "./components/Headers";
import NotesListPage from "./components/NotesListPage";
import NotePage from "./components/NotePage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="container dark">
            <div className="app">
                <Header />
                <Routes>
                    <Route exact path="/" element={<NotesListPage />} />
                    <Route exact path="/note/:id" element={<NotePage />} />
                </Routes>
            </div>
            </div>
        </Router>
    );
}

export default App;
