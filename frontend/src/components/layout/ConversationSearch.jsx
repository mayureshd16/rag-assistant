import SearchIcon from "@mui/icons-material/Search";

import {
  InputAdornment,
  TextField
} from "@mui/material";

function ConversationSearch({

  search,

  setSearch

}) {

  return (

    <TextField

      fullWidth

      size="small"

      placeholder="Search conversations..."

      value={search}

      onChange={(event) =>

        setSearch(event.target.value)

      }

      InputProps={{

        startAdornment: (

          <InputAdornment position="start">

            <SearchIcon />

          </InputAdornment>

        )

      }}

      sx={{

        mb: 2,

        "& .MuiOutlinedInput-root": {

          borderRadius: 3

        }

      }}

    />

  );

}

export default ConversationSearch;