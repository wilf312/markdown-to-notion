import { run } from "./markdownToNotion";

const markdownToNotion = (text: string) => {
  return run(text);
};

export const hello = () => {
  const a = markdownToNotion(`
# h1
## h2
### h3
#### h4
##### h5
###### h6

* list 1
* list 2
* list 3
* list 4

1. ol1
1. ol2
1. ol3
1. ol4
1. ol5

* [ ] todo1
* [x] todo2
  
`);

  console.log(a);
  // export { hello };
};
