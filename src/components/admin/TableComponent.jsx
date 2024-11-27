import { Link } from 'lucide-react'
import React from 'react'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'


function TableComponent({ headers, bodyData }) {
  return (
    <Table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <TableHeader>
          <TableRow>
            {headers.map((header, index) => (
                <TableHead key={index} className="text-left py-3 px-4">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        
        <TableBody>
        {bodyData.map((row, index) => (
          <TableRow key={index} className="hover:bg-gray-100">
            {row.map((cell, cellIndex) => (
              <TableHead key={cellIndex} className="py-3 px-4">{cell}</TableHead>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TableComponent