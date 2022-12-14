import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../../atoms2";

interface Iform {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<Iform>();
  const handleValid = ({ toDo }: Iform) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category: category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "please write a To do",
        })}
        type="text"
        placeholder="write a to do"
      />
      <button>Add</button>
    </form>
  );
}

export default CreateToDo;
