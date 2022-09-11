import { SearchWrapper } from "../styled/main"
import { TextInput } from "@mantine/core"
import { IconSearch } from "@tabler/icons"

export default function Search() {
    return (
        <SearchWrapper>
            <TextInput 
                placeholder="Search"
                size="md"
                icon={<IconSearch />}
                style={{ width: "50rem" }}
            />
        </SearchWrapper>
    )
}