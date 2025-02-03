import {read} from "./lib/read"


export default function page() {

  read().then(({ serialNumber } : any) => {
    console.log(serialNumber);
  });
  

  return (
    <div>
      hello
    </div>

  );
}
