/*
 * NAME: DataPage
 * DESCRIPTION: a specific component for this app - a template for a data view/edit/entry page with a title, link to add a book, and a datatable 
 */

import React from 'react'
import Table from './Table.jsx'

import permissions from '../data/permissions'

const DataPage = (props) => (
  <div className="row">
    <h3>
      {props.textTitle}&nbsp;
        { (props.permission === permissions.edit || props.permission === permissions.admin ) ?
          <small>
            <a 
              href="#" 
              className="btn btn-default btn-sm"
              onClick={props.dataAddStart}
              >
              {props.textAdd}
            </a>
          </small>
          : null
        }
      </h3>
    <br/>

    <Table
      cancelClick={props.dataCancelEdit}
      data={props.data}
      deleteClick={props.dataDelete}
      editClick={props.dataSetEdit}
      editId={props.dataEditingId}
      editChange={props.dataChange}
      editSave={props.dataUpdate}
      meta={props.meta}
      permission={props.permission}
    />
  </div>
) 

export default DataPage