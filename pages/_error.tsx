import ErrorNext from 'next/error'

function Error({statusCode}: {statusCode: number}) {
  if (statusCode === 404) {
    return (
      <p>
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : 'An error occurred on client'}
      </p>
    )
  }
  return <ErrorNext statusCode={statusCode} />
}

Error.getInitialProps = ({res, err}: {res: any; err: any}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return {statusCode}
}

export default Error
