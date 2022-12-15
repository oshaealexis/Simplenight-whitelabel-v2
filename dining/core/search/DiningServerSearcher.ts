import { applyApiBaseUrlV2 } from 'apiCalls/config/responseHelpers';
import { AxiosInstance, AxiosResponse } from 'axios';
import { ServerSearcher } from 'core/server/ServerSearcher';
import { DiningSearchResponse } from 'dining/types/response/SearchResponse';
import { NextApiRequest, NextApiResponse } from 'next';
import { ApiResponse } from 'types/global/Request';
import { CategoryOption } from 'types/search/SearchTypeOptions';
import { NextApiRequestWithSession } from '../../../types/core/server';

export class DiningServerSearcher extends ServerSearcher<DiningSearchResponse> {
  public constructor(category: CategoryOption) {
    super(category);
  }

  protected override preRequest(
    request: NextApiRequest,
    response: NextApiResponse<DiningSearchResponse>,
  ): [NextApiRequest, NextApiResponse<DiningSearchResponse>] {
    const lang = request.headers['accept-language'];

    return [request, response];
  }

  protected override doRequest(
    request: NextApiRequestWithSession,
    response: NextApiResponse<DiningSearchResponse>,
    axios: AxiosInstance,
  ): Promise<AxiosResponse<ApiResponse<any, DiningSearchResponse>, any>> {
    const { query: params } = request;
    let categoryUrls;
    if (this.category.core) {
      categoryUrls = this.category.core.urls;
    }
    const endpoint = categoryUrls?.search.server || '';
    const url = applyApiBaseUrlV2(endpoint, request);

    params.rsp_fields_set = 'basic';
    params.lang = 'en';
    params.covers = '2';
    params.limit = '20';
    params.sort_by = 'rating';

    delete params.cancellation_type;
    delete params.supplier_ids;

    return axios.get<ApiResponse<unknown, DiningSearchResponse>>(url, {
      params,
    });
  }
}