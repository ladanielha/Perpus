import { Link } from "@inertiajs/react";

const Pagination = ({ links, align }) => {
    // Mengecek apakah tombol next atau previous harus dinonaktifkan
    const isDisabled = (link) => link.url === null;

    // Mengecek apakah tombol next atau previous sudah mencapai halaman maksimal atau minimal
    const isMaximalPage = (link) => link.url === null && link.label.toLowerCase().includes('next');
    const isMinimalPage = (link) => link.url === null && link.label.toLowerCase().includes('previous');

    return (
        <nav>
            <ul className={`pagination flex justify-${align} mb-0 gap-2`}>
                {links.map((link, index) => (
                    <li className={`page-item ${link.active ? 'active' : ''}`} key={index}>
                        <Link 
                            className={`${isDisabled(link) ? 'page-link inline-block px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-300' : 'page-link inline-block px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-200'}`} 
                            href={isDisabled(link) ? '#' : link.url}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            onClick={(e) => (isMaximalPage(link) || isMinimalPage(link)) && e.preventDefault()}
                        />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
