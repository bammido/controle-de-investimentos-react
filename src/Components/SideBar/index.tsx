import { Sidebar as SidebarPrimeReact, SidebarProps } from 'primereact/sidebar';

export default function Sidebar(props: SidebarProps) {
    return <SidebarPrimeReact {...props}>
        {props.children}
    </SidebarPrimeReact>
}