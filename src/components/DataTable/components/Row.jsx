import React from 'react';

const Row = ({ edit_path, name, email }) => (
  <tr>
    <td>
      <a href={edit_path}>{name}</a>
      <br />
      <span>{email}</span>
    </td>
  </tr>
);

export default Row;
