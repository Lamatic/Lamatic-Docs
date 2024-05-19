import Link from "next/link";

const menuItems: {
  heading: string;
  items: { name: string; href: string }[];
}[] = [

];

const FooterMenu = () => {
  return (
    <div className="w-full">
      {/*<div className="grid grid-cols-2 md:grid-cols-5 text-base gap-y-8 gap-x-2">
        {menuItems.map((menu) => (
          <div key={menu.heading}>
            <p className="pb-2 font-mono font-bold text-primary">
              {menu.heading}
            </p>
            <ul className="flex flex-col gap-2">
              {menu.items.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-tight hover:text-primary/80"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div />
      </div>*/}
      <div className="my-8 font-mono text-sm">
        © 2023-{new Date().getFullYear()} Dinner Technologies Inc ( DBA Lamatic )
      </div>
    </div>
  );
};

export default FooterMenu;
