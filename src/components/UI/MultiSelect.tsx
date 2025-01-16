import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}
interface IMultiSelect {
  items: string[],
  label: string,
  id?: string,
  onChange?: (data: string[]) => void
  error?: boolean,
  helperText?: string
  preSelected:string[]
}

const MultiSelect: React.FC<IMultiSelect> = ({ items, label, id, onChange,error,helperText,preSelected }) => {
  const theme = useTheme();
  const [value, setValue] = React.useState<string[]>(preSelected);

  const handleChange = React.useCallback((event: SelectChangeEvent<typeof value>) => {

    const { target: { value }, } = event;
    let selectedItemsId = typeof value === 'string' ? value.split(',') : value;

    setValue(selectedItemsId);

    typeof onChange === 'function' && onChange(selectedItemsId);
  }, [onChange, items]);

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }} error={error}>
        <InputLabel id={"label-id" + id}>{label}</InputLabel>
        <Select
          error={error}
          fullWidth={true}
          size='small'
          labelId={"label-id" + id}
          id={id}
          multiple
          onChange={handleChange}
          value={value}
          input={<OutlinedInput id={id + "-intput"} label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value, index) => (
                <Chip key={value + index} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {items.map((item, index) => (
            <MenuItem
              key={item + index}
              value={item}
              style={getStyles(item, value, theme)}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
        <Typography variant="caption" color="error">{helperText}</Typography>
      </FormControl>
    </div>
  );

}


export default MultiSelect;