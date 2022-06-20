import {
  applyApiBaseUrlV2,
  sendSuccess,
} from 'apiCalls/config/responseHelpers';
import { AxiosInstance } from 'axios';
import { formatBooking } from 'helpers/bookingUtils';
import { NextApiRequest, NextApiResponse } from 'next';
import { GetBookingResponse } from 'types/confirmation/GetBookingResponse';
import { ApiResponse } from 'types/global/Request';
import { CoreOption } from 'types/search/SearchTypeOptions';
import { ServerRequester } from './ServerRequester';

export class ServerBookingGetter extends ServerRequester<GetBookingResponse> {
  public constructor() {
    const BookingCoreOption: CoreOption = {
      value: 'Booking',
      name: 'Booking',
    };
    super(BookingCoreOption);
  }

  protected override doRequest(
    request: NextApiRequest,
    _response: NextApiResponse,
    axios: AxiosInstance,
  ) {
    const { query } = request;
    const { id } = query;

    const endpoint = `/bookings/${id}`;
    const url = applyApiBaseUrlV2(endpoint, request);

    return axios.get<ApiResponse<any, GetBookingResponse>>(url);
  }

  protected override postRequestResult(
    request: NextApiRequest,
    response: NextApiResponse<GetBookingResponse>,
    result: GetBookingResponse,
  ): void {
    if (result.booking) {
      const { booking } = result;
      const formatResult = formatBooking(booking);
      sendSuccess(response, { booking: formatResult });
    }
  }
}
