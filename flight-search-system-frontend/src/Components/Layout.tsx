import { ReactNode } from "react";
import { Header } from "./Header";
import Sidebar from "./Sidebar";

export interface child {
    children: ReactNode;
}

const Layout = ({ children }: child) => {
    return (<>

        <Header />
        <div style={{ display: `flex`, height: '100%', justifyContent: 'space-around' }}>
            <Sidebar />
            <main className='layoutMain'>{children}</main>
        </div>
    </>);
}
export default Layout;