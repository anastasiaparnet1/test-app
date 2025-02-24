import report from '../7718_20250123_135605_1.json'

export const Table = (props: any) => {
    return <table border={2} className={'border-2 '}>
        {report.logs.map(({ test_case_name, test_run_id}) => {
            return <tr key={test_run_id} className={'border-2'}>
                 <td>Test case name: {test_case_name}</td>
            </tr>
        })
        }
    </table>
}
