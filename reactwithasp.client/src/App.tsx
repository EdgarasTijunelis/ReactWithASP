import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import { Layout } from "./pages/Layout";
import Students from "./pages/StudentsPage/Students";
import Lecturers from "./pages/LecturersPage/Lecturers";
import Groups from "./pages/GroupsPage/Groups";
import Subjects from "./pages/SubjectsPage/Subjects";
import StudyProgrammes from "./pages/StudyProgrammesPage/StudyProgrammes";



export default function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            Component: Layout,
            children: [
                {
                    index: true,
                    Component: Home
                },
                {
                    path: 'students',
                    Component: Students
                },
                {
                    path: 'lecturers',
                    Component: Lecturers
                },
                {
                    path: 'groups',
                    Component: Groups
                },
                {
                    path: 'subjects',
                    Component: Subjects
                },
                {
                    path: 'studyProgrammes',
                    Component: StudyProgrammes
                }
            ]
        },
    ]);
    return <RouterProvider router={router} />
}