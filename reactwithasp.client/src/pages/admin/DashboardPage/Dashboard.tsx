import useSWR from 'swr';
import { getApi } from "@/api";
import { IDashboard } from "@/interfaces/IDashboard";
import { IUser } from '../../../interfaces/IUser';
import { useState,useEffect } from 'react';

export default function Dashboard() {
    const { data, error, isLoading } = useSWR<IDashboard | undefined>(
        "admin/dashboard",
        getApi,
        { revalidateOnReconnect: true }
    );

    const [users, setUsers] = useState<IUser[]>([])
    const getUsers = () => getApi<IUser[]>('admin/dashboard').then(u => u && setUsers(u));

    useEffect(() => {
        getUsers().then(u => u)
    }, []);


    return (
        <div>
            <div>
        <h1 className='text-xl text-blue-950'>Admin dashboard</h1>
        {error ? <div>{error}</div> : null}
        {data?.text }
            </div>
                <div>
                {users.map((user) => (
                    <div key={user.userName} className="flex items-center justify-between mb-2">
                        <div style={{ flexGrow: 1 }}>
                                {user.userName} {user.email}
                        </div>
                    </div>))}
            </div>
        </div>
    )
}