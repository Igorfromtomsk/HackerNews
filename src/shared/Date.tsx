import React, { useMemo } from 'react';

interface DateComponentProps {
  time: number;
  className?: string;
}

const FormattedTime: React.FC<DateComponentProps> = ({ time, className }) => {
  const date = useMemo(() => new Date(time * 1000).toDateString(), [ time ]);

  return (
    <span className={className}>
      {date}
    </span>
  )
}

export default FormattedTime;