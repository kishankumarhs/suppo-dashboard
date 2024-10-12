import axiosClient from "config/axios.config";
import { useCallback, useEffect, useState } from "react";

/**
 * Custom hook to make a GET request to the specified URL.
 *
 * @param {string} URL - The URL to make the GET request to.
 * @return {object} An object containing loading, error, and data states.
 */
export const useGetRequest = (URL) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);
  useEffect(() => {
    async function getRequest(URL) {
      const response = await axiosClient.get(`/${URL}`);
      return response;
    }
    setLoading(true);
    getRequest(URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [refetch]);
  return {
    loading,
    error,
    data: error !== null || data === null ? [] : data,
    refetch: () => setRefetch((prev) => !prev),
  };
};

/**
 * Returns a tuple containing a lazy request function and an object with loading, error, and data states.
 * The lazy request function makes a GET request to the specified URL using axiosClient.
 * The loading state indicates whether the request is in progress.
 * The error state contains any error that occurred during the request.
 * The data state contains the response data from the request.
 *
 * @param {string} URL - The URL to make the GET request to.
 * @return {Array} A tuple containing the lazy request function and the object with loading, error, and data states.
 */
export const useGetRequestLazy = (URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const lazyRequest = useCallback(() => {
    async function getRequest(URL) {
      const response = await axiosClient.get(`/${URL}`);
      return response;
    }
    setLoading(true);
    getRequest(URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [
    lazyRequest,
    {
      loading,
      error,
      data: error !== null || data === null ? [] : data,
    },
  ];
};

/**
 * Custom hook to make a POST request to the specified URL.
 *
 * @param {string} URL - The URL to make the POST request to.
 * @param {object} payload - The data to be sent with the POST request.
 * @return {object} An object containing loading, error, and data states.
 */
export const usePostRequest = (URL, payload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    postRequest(URL, payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return {
    loading,
    error,
    data: error !== null || data === null ? [] : data,
  };
};

/**
 * Custom hook to make a lazy POST request to the specified URL.
 *
 * @param {string} URL - The URL to make the POST request to.
 * @return {Array} An array containing the lazy request function and an object with loading, error, and data states.
 */
export const usePostRequestLazy = (URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const lazyRequest = useCallback((payload) => {
    setLoading(true);
    postRequest(URL, payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [
    lazyRequest,
    {
      loading,
      error,
      data: error !== null || data === null ? [] : data,
    },
  ];
};

/**
 * Custom hook to make a PATCH request to the specified URL with the given payload.
 *
 * @param {string} URL - The URL to make the PATCH request to.
 * @param {object} payload - The data to be sent with the PATCH request.
 * @return {object} An object containing loading, error, and data states.
 */
export const usePatchRequest = (URL, payload) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    patchRequest(URL, payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return {
    loading,
    error,
    data: error !== null || data === null ? [] : data,
  };
};

/**
 * Custom hook to make a lazy PATCH request to the specified URL.
 *
 * @param {string} URL - The URL to make the PATCH request to.
 * @return {Array} An array containing the lazy request function and an object with loading, error, and data states.
 */
export const usePatchRequestLazy = (URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const lazyRequest = useCallback(async (payload) => {
    setLoading(true);
    await patchRequest(URL, payload)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [
    lazyRequest,
    {
      loading,
      error,
      data: error !== null || data === null ? [] : data,
    },
  ];
};

/**
 * Custom hook to make a DELETE request to the specified URL.
 *
 * @param {string} URL - The URL to make the DELETE request to.
 * @return {object} An object containing loading, error, and data states.
 *   - loading: A boolean indicating whether the request is in progress.
 *   - error: An error object if the request failed, otherwise null.
 *   - data: The response data from the request if it was successful, otherwise null.
 */
export const useDeleteRequest = (URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    setLoading(true);
    deleteRequest(URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return {
    loading,
    error,
    data: error !== null || data === null ? [] : data,
  };
};

/**
 * Custom hook to make a lazy DELETE request to the specified URL.
 *
 * @param {string} URL - The URL to make the DELETE request to.
 * @return {Array} An array containing the lazy request function and an object with loading, error, and data states.
 */
export const useDeleteRequestLazy = (URL) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const lazyRequest = useCallback((id) => {
    setLoading(true);
    deleteRequest(URL, id)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return [
    lazyRequest,
    {
      loading,
      error,
      data: error !== null || data === null ? [] : data,
    },
  ];
};

export async function postRequest(URL, payload) {
  const response = await axiosClient.post(`/${URL}`, payload);
  return response;
}

export async function patchRequest(URL, payload) {
  const response = await axiosClient.patch(`/${URL}`, payload);
  return response;
}

export async function deleteRequest(URL, id) {
  const response = await axiosClient.delete(`/${URL}/${id}`);
  return response;
}

export async function getRequest(URL) {
  const response = await axiosClient.get(`/${URL}`);
  console.log("calling", axiosClient);
  return response;
}
