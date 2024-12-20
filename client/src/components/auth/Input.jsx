import { TextField, Grid2, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({
  name,
  label,
  half,
  autoFocus,
  type,
  handleChange,
  handleShowPassword,
}) => {
  return (
    <Grid2 size={{ xs: 12, sm: half ? 6 : 12 }}>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        autoFocus={autoFocus}
        required
        fullWidth
        type={type}
        slotProps={
          name === "password"
            ? {
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {type === "password" ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }
            : null
        }
      />
    </Grid2>
  );
};

export default Input;
