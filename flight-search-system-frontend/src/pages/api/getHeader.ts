export default function getHeader()
{
    const getToken =localStorage.getItem('authToken');
    return {
        'Content-Type': 'application/json',
          'Authorization': `Bearer ${getToken}`,
    }
}