import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";

const Card = () => {
  const changeColor = () => {
    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };

  console.log(changeColor());

  const data = Array.from({ length: 20 }, () => {
    const letter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return {
      name: letter[Math.floor(Math.random() * letter.length)],
      price: Math.floor(Math.random() * 10000),
      id: uuid(),
    };
  });

  return (
    <div>
      <center>
        <div>start</div>

        <div className="flex flex-wrap m-4 ">
          {data?.map((props: any) => (
            <div
              key={props.id}
              className="w-[200px] min-h-[200px] border rounded p-1 m-2 "
            >
              <div
                className={`w-full h-[200px] rounded `}
                style={{ backgroundColor: `${changeColor()}` }}
              />
              <div>{props.name}</div>
              <div className="text-[12px] font-bold">Price: ₦{props.price}</div>

              <Link to={`/${props.id}/detail`}>
                <button className="w-full uppercase bg-red-300  py-2 mt-1 text-[12px] font-bold ">
                  Selected
                </button>
              </Link>
            </div>
          ))}
        </div>
      </center>
    </div>
  );
};

export default Card;
