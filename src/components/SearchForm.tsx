import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";
import { useAuthStore } from "@/modules/store/user-store";
import { auth } from "../../auth";
import { User } from "@/types/auth";

const SearchForm = async ({ query }: { query?: string }) => {
  const session = await auth();
  // console.log("1", useAuthStore.getState());
  // useAuthStore.setState({ user: session?.user as unknown as User });
  // console.log(useAuthStore.getState());
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search start"
      />
      <div className="flex gap-2">
        {query && <SearchFormReset />}
        <button type="submit" className="search-btn text-white">
          <Search className="size-50" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
